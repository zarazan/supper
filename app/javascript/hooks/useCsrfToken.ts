import { useState, useEffect } from 'react';

const useCsrfToken = (): string => {
  const [csrfToken, setCsrfToken] = useState<string>("");

  useEffect(() => {
    const csrf_element = document.querySelector('meta[name="csrf-token"]')
    if (csrf_element) {
      setCsrfToken(csrf_element.getAttribute('content') || "");
    }
  }, []);

  return csrfToken;
};

export default useCsrfToken;
