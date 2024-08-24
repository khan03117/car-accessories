// import React from 'react'
import PropTypes from 'prop-types';
const ErrorSpan = ({ errors = [], path }) => {
    if (!Array.isArray(errors)) {
        return null;
    }
    return (
        <>
            {
                errors.length > 0 && errors.find(obj => obj.path == path)?.msg && (
                    <>
                        <span className="text-xs block text-red-600 tracking-wider font-light">
                            {
                                errors.find(obj => obj.path == path)?.msg
                            }
                        </span>
                    </>
                )
            }
        </>
    )
}
ErrorSpan.propTypes = {
    errors: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired
}
export default ErrorSpan