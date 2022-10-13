import React from 'react';
import { ErrorMessage, useField } from 'formik';
import { Input, InputGroup, Button } from '@chakra-ui/react';

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <label htmlFor={field.name}>{label}</label>
      {/* <InputGroup>
        <Input
          className={`${meta.touched && meta.error && 'is-invalid'}`}
          {...field}
          {...props}
          autoComplete="off"
        />
        <Button
          variant={'ghost'}
          onClick={() => setShowPassword((showPassword) => !showPassword)}
        >
          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
        </Button>
      </InputGroup> */}
      <Input
        className={`${meta.touched && meta.error && 'is-invalid'}`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};
