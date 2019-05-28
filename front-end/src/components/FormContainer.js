import React, { useState } from 'react';
import Form from './logic/Form';
import Menu from './Menu';

function FormContainer()
{
    const [page, setPage] = useState('signIn');

    function handleClick(state) {
        setPage(state);
    }
    return (
        <div>
            <Menu
                signIn={() => handleClick('signIn')}
                signUp={() => handleClick('signUp')}
                active={page}
            />
            <Form type={page} />
        </div>
    );
}

export default FormContainer;
