import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

const Modal = ({ config, children }) => {
    const {
        isVisible,
        title,
        text,
        styles,
        onClose,
    } = config;

    if (!isVisible) {
        return null;
    }

    const defaultStyles = {
        overlay: {

        },
        modal: {
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
        },
        text: {
            fontSize: '16px',
            color: 'gray',
        },
        closeButton: {
            position: 'absolute',
            color : ' #fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: '15px',
        },
    };

    const mergedStyles = {
        overlay: { ...defaultStyles.overlay, ...styles.overlay },
        modal: { ...defaultStyles.modal, ...styles.modal },
        title: { ...defaultStyles.title, ...styles.title },
        text: { ...defaultStyles.text, ...styles.text },
        closeButton: { ...defaultStyles.closeButton, ...styles.closeButton },
    };

    return (
        <div className="modal-overlay" style={mergedStyles.overlay}>
            <div className="modal" style={mergedStyles.modal}>
                <button
                    className="close-button"
                    onClick={onClose}
                    style={{
                        ...mergedStyles.closeButton
                    }}
                >x</button>
                <h2 style={mergedStyles.title}>{title}</h2>
                <p style={mergedStyles.text}>{text}</p>
                <div className="custom-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    config: PropTypes.shape({
        isVisible: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        styles: PropTypes.object,
        onClose: PropTypes.func.isRequired,
    }).isRequired,
    children: PropTypes.node,
};

export default Modal;

//Utilisation
// const [isModalVisible, setIsModalVisible] = useState(true);
// const handleClose = () => setIsModalVisible(false);
// const config = {
//     isVisible: isModalVisible,
//     title: "confirmation",
//     text: "employee added",
//     onClose: handleClose,
//     styles: {
//         overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)'},
//         modal: {width:'350px',height:'100px'},
//         title: { color: '#43970a' },
//         text: { fontSize: '18px' }
//     }
// };