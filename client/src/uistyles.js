import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 3,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    body: {
        padding: '50px'
    },
    navbar: {
        padding: '10px'
    }, 
    tab: {
        textAligh: 'center'
    }
  }));