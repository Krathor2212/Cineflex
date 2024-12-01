import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export function SitemarkIcon() {
  return (
    <SvgIcon sx={{ height: 50, width: 90 }}>
      <image
        href="images/logo.png" // Replace with the path to your custom image
        width={35}
        height={30}
      />
    </SvgIcon>
  );
}
