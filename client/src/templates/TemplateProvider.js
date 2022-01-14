import React from 'react';
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const TemplateContext = React.createContext(null);

export const TemplateProvider = ({ children }) => {
    const theme = createTheme({
        overrides: {
            MuiDialog: {
                paperWidthSm: {
                    maxWidth: 'unset'
                }
            },
            MuiDialogContent: {
                root: {
                    padding: 0,
                    '&:first-child': {
                        paddingTop: 0
                    }
                }
            },
            MuiTableCell: {
                root: {
                    borderBottom: 0
                }
            },
            MuiStepIcon: {
                root: {
                    '&$completed': {
                        color: '#2874f0'

                    },
                    '&$active': {
                        color: '#354abf'
                    },
                },
            },
            MuiStepLabel: {
                label: {
                    '&$active': {
                        color: 'white'
                    },
                }
            }
            // .MuiStepLabel-label.MuiStepLabel-active

        },
        custom: {
            palette: {
                header: {
                    background: '#2874f0'
                }
            }
        }
    });

    return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
    );
}

export default TemplateProvider;