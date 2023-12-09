export const DateFormatter = (date) => {
    if (!!date){
      const d = new Date(date);
      const formattedDate = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
      return formattedDate;
    }
    return null;
  };


  export const TimeFormatter = (date) =>{
    if(!!date){
      const d = new Date(date)
      const formattedTime = `${String(d.getUTCHours()).padStart(2, '0')} : ${String(d.getUTCMinutes()).padStart(2, '0')}`
      return formattedTime
    }
    return null
  }