import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import { useTodo } from '../../context/TodoContext';


const AddTodoForm: React.FC = () => {
    const { addTodo } = useTodo();

    const formik = useFormik({
        initialValues: { title: '', description: '' },
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
        }),
        onSubmit: (values, { resetForm }) => {
            addTodo({
                id: Date.now(),
                title: values.title,
                description: values.description,
                completed: false,
                status: 'incomplete',
            });
            resetForm();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4 mb-6">
            <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
                Add Todo
            </Button>
        </form>
    );
};

export default AddTodoForm;
