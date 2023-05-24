import CustomButton from "./CustomButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface CustomDialogProps {
  handleClose: () => void;
  action: () => void;
  title: string;
  open: boolean;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  handleClose,
  title,
  open,
  action,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogActions>
        <CustomButton onClick={handleClose} label='Cancel' />
        <CustomButton onClick={action} label='Continue' outline />
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
