import { useCallback } from "react";
import { useSnackbar } from 'notistack';

export const useMessage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showMessage = useCallback((message, type, time = 3000) => {
    if (!message || !type) {
      return console.log({ error: "Message or type are empty"});
    }

    enqueueSnackbar(message, {
      variant: type,
      autoHideDuration: time 
    });
  }, [enqueueSnackbar]);

  return useCallback(data => {
    if (!data) {
      return console.log({ error: "Data is empty"});
    }
    
    const error = "error";
    const success = "success";
    
    switch (data.status) {
      case 400:
        if (Array.isArray(data.message)) {
          let temp = "";

          data.message.forEach(element => {
            if (element.param !== temp) {
              temp = element.param;
      
              showMessage(element.msg, error);
            }
          });

          return;
        }
        
        showMessage(data.message, error);
        break;
      case 200:
        if (data?.message) {
          showMessage(data.message, success);
        }
        break;
      default:
        showMessage(data.message, error);
        break;
    }
  }, [showMessage]);
};