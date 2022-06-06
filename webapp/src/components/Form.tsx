import React from "react";

import { Send as SendIcon } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import { AuthContext } from "../contexts/AuthContext";
import { WSContext } from "../contexts/WS";

const Form = () => {
  const { sendMessage } = React.useContext(WSContext);
  const { profile } = React.useContext(AuthContext);
  const name = profile?.name!;
  const imageUrl = profile?.imageUrl!;

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: yup.object({
      message: yup.string().max(500).required(),
    }),
    onSubmit: (values) => {
      const { message } = values;
      const timestamp = +new Date();
      sendMessage({ imageUrl, message, name, timestamp });
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.isValid}
      <Box height={50} sx={{ backgroundColor: "rgba(100, 100, 100, 0.5)" }}>
        <Grid container justifyContent="stretch">
          <Grid item flexGrow={1}>
            <ButtonGroup fullWidth>
              <TextField
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                size="small"
                required
                fullWidth
                sx={{ m: 0.5, backgroundColor: "#fff", borderRadius: 1 }}
                inputProps={{
                  maxLength: 500,
                }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ m: 0.5, ml: 0, width: 65 }}
              >
                <SendIcon />
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default Form;
