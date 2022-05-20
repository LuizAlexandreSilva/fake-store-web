import React from 'react';
import { Spinner } from 'reactstrap';

function Loading() {
  return (
    <div className="d-flex align-items-center justify-content-center w-100 h-100">
      <Spinner type="grow" color="primary">
        Loading...
      </Spinner>
    </div>
  );
}

export default Loading;
