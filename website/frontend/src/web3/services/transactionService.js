import { parseWeb3Error } from '../utils/errors';

class TransactionService {
  /**
   * Estimates gas for a contract transaction.
   * @param {Object} contract - The ethers Contract instance
   * @param {string} methodName - The method to call
   * @param {Array} args - Arguments for the method
   * @param {string} value - Optional ETH value
   * @returns {Object} { gasLimit, error }
   */
  async estimateGas(contract, methodName, args = [], value = '0') {
    try {
      const options = value !== '0' ? { value } : {};
      const estimatedGas = await contract[methodName].estimateGas(...args, options);
      // Add a 20% buffer to gas limit
      const gasLimit = (estimatedGas * 120n) / 100n;
      return { gasLimit, error: null };
    } catch (err) {
      console.error(`Gas estimation failed for ${methodName}:`, err);
      return { gasLimit: null, error: parseWeb3Error(err) };
    }
  }

  /**
   * Waits for a transaction to be confirmed and parses any errors.
   * @param {Object} tx - The ethers.js transaction object
   * @param {number} confirmations - Number of confirmations to wait for
   * @returns {Object} { success, receipt, error }
   */
  async waitForTransaction(tx, confirmations = 1) {
    try {
      const receipt = await tx.wait(confirmations);
      return { success: true, receipt, error: null };
    } catch (err) {
      console.error('Transaction Failed:', err);
      return { success: false, receipt: null, error: parseWeb3Error(err) };
    }
  }
}

export const transactionService = new TransactionService();
