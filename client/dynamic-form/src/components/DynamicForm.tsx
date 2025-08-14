import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { getSchema, getSubmissions, submitForm } from "../api/api";
import { Controller, useForm, FieldError } from 'react-hook-form';
// import * as yup from "yup";
import { formSchema, FormValues } from "../Validations/FormValidations";
import { yupResolver } from "@hookform/resolvers/yup";

type Submission = {
  // define the field types according the backend part
   id: string;
   data: Record<string, any>;
   created_at: number;
};

type Field = {
    name: keyof FormValues;
    type: string;
    label: string;
    required?: boolean;
    options?: string[];
}

// type errorFields = {
//     name: string;
//     email: string;
//     date: string;
//     password: string;
// }
// type FormValues = {
//   name: string;
//   email: string;
//   password: string;
// };

export default function SubmissionsList() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const { control, handleSubmit, reset,  formState: { errors } } = useForm({
    resolver: yupResolver(formSchema),
    context: submissions,
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  //const [errorFields, setErrorFields] = useState<Record<string, string>[]>([]); // Not in use
  const [timer, setTimer] = useState(Date.now())

   useEffect(() => {
     const interval = setInterval(() => setTimer(Date.now()), 3000);
     return () => {
         clearInterval(interval);
     };
    }, []);

  useEffect(() => {
    const fetchSchema = async () => {
        const data = await getSchema();
        setFields(data.fields);
    }

    const fetchSubmossions = async () => {
        const data = await getSubmissions();
        setSubmissions(data)
    }
    fetchSchema();
    fetchSubmossions();

  }, [timer]);

  const onSubmit = async (data: any) => {
    // console.log("onsubmit actions ..data= ", data);
    try {
        await formSchema.validate(data, { context : submissions })
        // console.log("valid!");
        const response = await submitForm(data)
        // console.log(response);
        if(response.status && response.status === 200) {
            setSuccessMsg("Submission sent successfuly!") ;
            setErrorMsg("")
        }
        else {
            setErrorMsg("Failed to submit. Try again")
            setSuccessMsg("")
        }
        reset();
    } catch (err: any) {
            setErrorMsg(err.message);
            setSuccessMsg("")
    }
  }

//   const deleteDoc = (data: any) => {
//     deleteSubmission(data);
//   }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }} >
        <Typography variant="h6">Dynamic Form</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map(field => (
                <Controller 
                    key={field.name}
                    name={field.name}
                    control={control}
                    defaultValue=""
                    render={({field: controllerField}) => {
                       const error = errors[field.name] as FieldError | undefined; 
                       return (
                        field.type == "dropdown" ? (
                            <TextField
                                select
                                fullWidth
                                label={field.name}
                                margin="normal"
                                error={!!error} // marks the field as error
                                helperText={error ? error.message : ""} // shows error message
                                {...controllerField}
                            >
                             {field.options?.map(option => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                             ))}
                            </TextField>
                        ) : (
                            <TextField
                                type={field.type}
                                fullWidth
                                margin="normal"
                                label={field.label}
                                error={!!error}
                                helperText={error ? error.message : ""}
                                {...controllerField}
                            >
                            </TextField>
                        )
                    )}}
                />
            ))}
            {/* {errorFields.map((errObj, idx) => (
                <p key={idx}>{Object.values(errObj)[0]}</p>
            ))} */}
            <Button type="submit" variant="contained" sx={{mt:2}}>Submit</Button>
            <Button type="button" variant="outlined" sx={{mt:2, ml:2}} onClick={() => {reset(); setErrorMsg(""); setSuccessMsg("")}}>Reset</Button>
            {errorMsg && <p style={{color: "red"}}>{errorMsg}</p>}
            {successMsg && <p style={{color: "green"}}>{successMsg}</p>}
        </form>
    </Box>
  );
}