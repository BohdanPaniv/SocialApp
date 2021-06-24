import { useCallback } from "react";
import { useSnackbar } from 'notistack';

export const useMessage = () => {

  const { enqueueSnackbar } = useSnackbar();

  return useCallback(errors => {

    let temp = "";

    errors.forEach(element => {
      if (element.param !== temp) {
        temp = element.param;

        enqueueSnackbar(element.msg, {
          variant: "error",
          autoHideDuration: 3000 
        });
      }
    });
  }, [enqueueSnackbar])
}