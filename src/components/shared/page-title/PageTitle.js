import React from 'react';
import './PageTitle.css';

const PageTitle = ({pageTitle}) => (
    <div className="page-title">
        <h3 className="text-title">{pageTitle}</h3>
    </div>
);

export default PageTitle;