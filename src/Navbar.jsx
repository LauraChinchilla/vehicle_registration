import React from 'react';
import './style.css';
import { Box, Breadcrumb, BreadcrumbLink } from '@chakra-ui/react';
export default function Navbar() {
  return (
    <div className="banner" >
      <Breadcrumb>
        <BreadcrumbLink href="/">
          <img
            src="logo512.png"
            alt="Bienvenido a AutoLog"
            style={{ width: '100px', height: 'auto' }}
          />
        </BreadcrumbLink>
        <Box marginLeft="730">
          <BreadcrumbLink>Bienvenido a AutoLog</BreadcrumbLink>
        </Box>
      </Breadcrumb>
    </div>
  );
}
