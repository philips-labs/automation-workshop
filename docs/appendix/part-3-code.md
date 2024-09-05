# Part 3: Code - React Cat Preview Field Extension

Below is the code for the React component that we will be creating in this exercise. This component will display a random cat picture from the Cat API.

```typescript
import React, { useEffect, useState } from 'react';
import { FieldExtensionComponentProps } from '@backstage/plugin-scaffolder-react';
import FormControl from '@material-ui/core/FormControl';
import { Button, FormHelperText, FormLabel } from '@material-ui/core';

export interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}

/*
 This is the actual component that will get rendered in the form
*/
export const RandomCatPixExtension = ({
  onChange,
  rawErrors,
  required,
  formData,
}: FieldExtensionComponentProps<string>) => {
  const [catPic, setCatPic] = useState('');

  const refreshPic = async () => {
    const catResult = await fetch('https://api.thecatapi.com/v1/images/search');
    const catData: Record<string, CatResult> = await catResult.json();
    setCatPic(catData[0].url);
    onChange(catData[0].url);
  };

  useEffect(() => {
    refreshPic();
  }, []);

  return (
    <FormControl
      margin="normal"
      required={required}
      error={rawErrors?.length > 0 && !formData}
    >
      <FormLabel>Random Cat Picture</FormLabel>
      <Button variant="contained" color="primary" onClick={() => refreshPic()}>
        Refresh 😻
      </Button>

      <img src={catPic} alt="Random Cat" width={'500px'} />

      <FormHelperText id="entityName">
        Giving you a random cat picture, all day, every day.
      </FormHelperText>
    </FormControl>
  );
};
```