import React from 'react'
// Add this function in your code

const formatAccountId = (accountId) => {
    const accountIdStr = String(accountId);
  
    if (accountIdStr.length < 8) {
      // If the account ID is too short, don't modify it
      return accountIdStr;
    } else {
      const maskedPart = '*'.repeat(accountIdStr.length - 8) + accountIdStr.slice(-8);
      return maskedPart;
    }
  };
  
  // Update the Seller Account ID column rendering in your component
  
  // ...
  
  <td>{formatAccountId(promise.seller_account_id)}</td>
  
  // ...
  

export default FormatNumber


