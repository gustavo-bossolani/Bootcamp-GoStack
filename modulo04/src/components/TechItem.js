import React from 'react';

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

export default TechItem;