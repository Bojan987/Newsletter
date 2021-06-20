import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#231F20',
        },
        action: {
            active: '#333333',
        },
        secondary: {
            main: '#909090',
        },
        success:{
            main:'#006442'
        },
       warning:{
           main:'#cc0000'
       }
    },

    typography: {
        fontFamily: 'Abel,serif',
        color: '#909090',
        button: {
            fontFamily: 'Libre Franklin',
            fontSize: '0.75rem',
        },
        h1: {
            fontFamily: 'Bitter',
            fontSize: '3.5rem',
            fontWeight: 500,
        },
        h2: {
            fontFamily: 'Bitter',
            fontSize: '1.7rem',
            fontWeight:700
        },
        h3: {
            fontFamily: 'Bitter',
            fontSize: '2rem',
            fontWeight: 500,
        },
        h4: {
            fontFamily: 'Bitter',
            fontSize: '1.3rem',
            fontWeight: 500,
        },
        h5: {
            fontFamily: 'Bitter',
            fontSize: '1rem',
            fontWeight: 600,
        },
        h6:{
            fontFamily: 'Bitter',
            fontSize: '0.9rem',
            fontWeight: 600,
        },
        
        body1: {
            color: '#909090',
            fontSize: '1rem',
        },
        body2: {
            color: '#909090',
            fontSize: '0.9rem',
        },
        caption: {
            color: '#909090',
            fontSize: '1rem',
        },
        subtitle1:{
            fontFamily: 'Bitter',
            fontSize: '1.3rem',
            fontWeight: 500,
        },
        subtitle2:{
            fontFamily: 'Bitter',
            fontSize: '0.75rem',
            
        },
        
    },
    shape: 0,
    overrides: {
        MuiTextField: {
            root: {
                borderColor: '#909090',
            },
        },
    MuiButton:{
        root:{
            padding:'4px 16px'
        }
    }
        
    },
    props: {
        MuiLink: {
            underline: 'none',
            color: 'primary',
            fontFamily: 'Libre Franklin',
        },
    },
})

// active: '#333333', - done
// logo: '#666666', -manual
// inBorder: '#CCCCCC', -
// border: '#F2F2F2'
// Text color, input text #909090
