import * as yup from "yup";

interface Submission {
  data: {
    name: string;
    email: string;
    date: string;
    password: string;
    // add other fields if needed
  };
}

export const formSchema = yup.object().shape({
    name: yup.string().required("Name is required").test("name-exists", "Name already exists", function (value: string) {
        const submissions = this.options.context as Submission[];
        if(!submissions || !submissions.length) return true;
        const existingNames = submissions?.map(sub => sub.data.name)
        return !existingNames.find(existing_name => value === existing_name)
    }),
    email: yup.string().email("Invalid email format").required("Email is required").test("email-exists", "Email already exists", function (value: string) {
      const submissions = this.options.context as Submission[]; // type casting, due to the error type that I had with the any type on sub
      // console.log("validation log submissions: ", submissions);
      if(!submissions || !submissions.length) return true;
      const existingEmails = submissions?.map(sub => sub.data.email)
      return !existingEmails.find(email => value === email);
    }),
    password: yup.string().min(4, "Password too short").max(10, "Password too long").required("Password is required"),
    date: yup.string().default("Invalid date")
})

export type FormValues = yup.InferType<typeof formSchema>;