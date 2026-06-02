import React from 'react';

export default function FormGroup({ id, label, erro, obrigatorio, children, style }) {
  return (
    <div className={`form-grupo${erro ? ' invalido' : ''}`} id={`grupo-${id}`} style={style}>
      {label && (
        <label htmlFor={id}>
          {label} {obrigatorio && <abbr title="obrigatório">*</abbr>}
        </label>
      )}
      {children}
      {erro && (
        <span className="erro-msg" id={`erro-${id}`} role="alert">{erro}</span>
      )}
    </div>
  );
}
