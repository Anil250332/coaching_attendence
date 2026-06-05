import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Student {
  id: number;
  name: string;
  email: string;
  avatar: string;
  studentId: string;
  course: string;
  batch: string;
  attendance: string;
  lastTest: string;
  rank: string;
  feeStatus: string;
}

interface StudentState {
  list: Student[];
}

const initialState: StudentState = {
  list: [
    { id: 1, name: 'Aarav Sharma', email: 'aarav.sharma@email.com', avatar: 'https://i.pravatar.cc/150?u=aarav', studentId: 'STU-2024-1247', course: 'IIT-JEE', batch: 'IIT-JEE A-12', attendance: '94.5%', lastTest: '92%', rank: '#12', feeStatus: 'Paid' },
    { id: 2, name: 'Diya Patel', email: 'diya.patel@email.com', avatar: 'https://i.pravatar.cc/150?u=diya', studentId: 'STU-2024-1248', course: 'NEET', batch: 'NEET B-15', attendance: '88.3%', lastTest: '85%', rank: '#24', feeStatus: 'Paid' },
    { id: 3, name: 'Vivek Kumar', email: 'vivek.kumar@email.com', avatar: 'https://i.pravatar.cc/150?u=vivek', studentId: 'STU-2024-1249', course: 'IIT-JEE', batch: 'IIT-JEE A-14', attendance: '91.2%', lastTest: '78%', rank: '#45', feeStatus: 'Pending' },
    { id: 4, name: 'Neha Singh', email: 'neha.singh@email.com', avatar: 'https://i.pravatar.cc/150?u=neha', studentId: 'STU-2024-1250', course: 'SSC', batch: 'SSC C-01', attendance: '98.1%', lastTest: '89%', rank: '#05', feeStatus: 'Paid' },
    { id: 5, name: 'Rohan Gupta', email: 'rohan.gupta@email.com', avatar: 'https://i.pravatar.cc/150?u=rohan', studentId: 'STU-2024-1251', course: 'Banking', batch: 'BANK D-03', attendance: '82.4%', lastTest: '74%', rank: '#56', feeStatus: 'Pending' },
    { id: 6, name: 'Priya Desai', email: 'priya.desai@email.com', avatar: 'https://i.pravatar.cc/150?u=priya', studentId: 'STU-2024-1252', course: 'NEET', batch: 'NEET B-12', attendance: '96.8%', lastTest: '95%', rank: '#08', feeStatus: 'Paid' },
    { id: 7, name: 'Amit Verma', email: 'amit.verma@email.com', avatar: 'https://i.pravatar.cc/150?u=amit', studentId: 'STU-2024-1253', course: 'IIT-JEE', batch: 'IIT-JEE A-11', attendance: '89.5%', lastTest: '81%', rank: '#33', feeStatus: 'Paid' },
    { id: 8, name: 'Sneha Reddy', email: 'sneha.reddy@email.com', avatar: 'https://i.pravatar.cc/150?u=sneha', studentId: 'STU-2024-1254', course: 'SSC', batch: 'SSC C-02', attendance: '92.0%', lastTest: '88%', rank: '#15', feeStatus: 'Pending' },
    { id: 9, name: 'Karan Malhotra', email: 'karan.malhotra@email.com', avatar: 'https://i.pravatar.cc/150?u=karan', studentId: 'STU-2024-1255', course: 'Banking', batch: 'BANK D-01', attendance: '85.5%', lastTest: '79%', rank: '#41', feeStatus: 'Paid' },
    { id: 10, name: 'Ananya Joshi', email: 'ananya.joshi@email.com', avatar: 'https://i.pravatar.cc/150?u=ananya', studentId: 'STU-2024-1256', course: 'NEET', batch: 'NEET B-14', attendance: '97.2%', lastTest: '94%', rank: '#10', feeStatus: 'Paid' },
  ],
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.list.push(action.payload);
    },
    removeStudent: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(student => student.id !== action.payload);
    },
  },
});

export const { addStudent, removeStudent } = studentSlice.actions;
export default studentSlice.reducer;
