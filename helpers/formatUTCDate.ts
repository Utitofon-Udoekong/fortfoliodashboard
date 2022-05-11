const utcFormatter = (dateString: string | number | Date) => {
    
    return new Date(dateString.toLocaleString());
  };


export default utcFormatter;