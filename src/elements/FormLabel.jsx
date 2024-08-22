import PropTypes from 'prop-types';

const FormLabel = ({ label }) => {
    return (
        <>
            <label htmlFor="" className='text-xs  text-primary block mb-2 font-light uppercase tracking-wider'>{label}</label>
        </>
    )
}
FormLabel.propTypes = {
    label: PropTypes.string.isRequired,
}

export default FormLabel