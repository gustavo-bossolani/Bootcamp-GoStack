import React from 'react';
import PropTypes from 'prop-types';

function TechItem({ tech, onDelete }) {
    return (
        <li>
            {tech}
            <button
                onClick={onDelete}
                type="button">
                <b>X</b>
            </button>
        </li>
    );
}

TechItem.defaultProps = {
    tech: 'Default'
};

TechItem.propTypes = {
    tech: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
};

export default TechItem;