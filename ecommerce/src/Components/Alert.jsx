import Alert from 'react-bootstrap/Alert';


function AlertCustom({ variant, text }) {
    return (
        <Alert variant={variant} className="w-50 mx-auto mt-3 mb-3">
            {text}
        </Alert>
    );
};

export default AlertCustom;