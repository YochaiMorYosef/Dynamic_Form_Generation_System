import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import { getSubmissions, getTotalSubmissions } from "../api/api";

type Submission = {
  // define the field types according the backend part
   id: string;
   data: Record<string, any>;
   created_at: number;
};

export default function PreviousSubmissionsList() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [avgAge, setAvgAge] = useState<number>(0);
  const [totalMale, setTotalMale] = useState<number>(0);
  const [totalFemale, setTotalFemale] = useState<number>(0);
  const [totalUnselectedGender, setTotalUnselectedGender] = useState<number>(0);
  const [timer, setTimer] = useState(Date.now())

   useEffect(() => {
     const interval = setInterval(() => setTimer(Date.now()), 3000);
     return () => {
         clearInterval(interval);
     };
    }, []);

  useEffect(() => {
    const fetchSubmossions = async () => {
        const data = await getSubmissions();
        setSubmissions(data)
        const total_male = submissions.filter(item => item.data.gender == "Male")
        const total_female = submissions.filter(item => item.data.gender == "Female")
        const total_unselected = submissions.filter(item => item.data.gender == "")
        // analytics that returns the avg / total of male/female/unselected gender
        const ages = submissions.map(item => {
            if(item.data.age && item.data.age !== "")
                return item.data.age
        })
        let sum_age = 0
        ages.forEach(age => {sum_age+=parseInt(age)})
        const avg_age = sum_age / ages.length;
        setAvgAge(avg_age? avg_age : 0)
        setTotalMale(total_male.length)
        setTotalFemale(total_female.length)
        setTotalUnselectedGender(total_unselected.length)
    }
    const fetchTotalSubs = async () => {
        const count = await getTotalSubmissions();
        setTotal(count);
    }
    fetchSubmossions();
    fetchTotalSubs();
  }, [timer]); // useState depandes on timer and fetches the data everytime

//   const deleteDoc = (data: any) => {
//     deleteSubmission(data);
//   }

  return (
     <Box sx={{ maxWidth: 300, mx: "auto", mt: 5 }} >
        <Typography variant="h6">Previous Submissions</Typography>
        <Box sx={{ mt: 1 ,  maxHeight: 300, maxWidth: 500, overflowY: 'auto', p: 2}}>
        <Table>
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {submissions.length? (submissions.map((sub, rowIndex) => (
            <TableRow key={rowIndex}>
                <TableCell>
                    {sub.data.name}
                </TableCell>
                <TableCell>
                    {sub.data.email}
                </TableCell>
            </TableRow>
            ))) : (
            <TableRow>
                <TableCell>
                    There are no any submissions.
                </TableCell>
            </TableRow>
            )}
        </TableBody>
        </Table>
         <p>Total Submissions: {total}</p>
         <p>Male: {totalMale} Female: {totalFemale} Unselected: {totalUnselectedGender}</p>
         <p>Average Age: {avgAge}</p> 
        </Box>
    </Box>
    // Another option for displaying the data
    //   <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }} >
    //     <Typography variant="h6">Previous Submissions</Typography>
    //     <Box sx={{ mt: 1 ,  maxHeight: 300, maxWidth: 400, overflowY: 'auto', p: 2}}>
    //     {submissions.map(sub => (
    //         <div style={{ width: '100%' }}>
    //                 <Box
    //                 component="span"
    //                 sx={(theme) => ({
    //                 display: 'block',
    //                 p: 1,
    //                 m: 0,
    //                 bgcolor: '#fff',
    //                 color: 'grey.800',
    //                 // border: '1px solid',
    //                 // borderColor: 'grey.300',
    //                 borderRadius: 2,
    //                 fontSize: '0.875rem',
    //                 fontWeight: '700',
    //                 ...theme.applyStyles('dark', {
    //                     bgcolor: '#101010',
    //                     color: 'grey.300',
    //                     borderColor: 'grey.800',
    //                 }),
    //                 })}
    //             >
    //             {sub.data.name}
    //             </Box>
    //         </div>
    //     ))}
    //     {/* <List> */}
    //         {/* {submissions.map(sub => ( */}
    //             {/* <ListItem key={sub.id}>
    //                 <ListItemText primary={sub.id} secondary={sub.data.name} />
    //                 <ListItemButton onClick={deleteDoc}>Delete</ListItemButton> 
                    
    //             </ListItem> */}
    //         {/* ))} */}
    //     {/* </List> */}
    //   </Box>
    //     <p>Total Submissions: {total}</p>
    //     <p>Male: {totalMale} Female: {totalFemale} Unselected: {totalUnselectedGender}</p>
    //     <p>Average Age: {avgAge}</p>
    // </Box>
  );
}