import { getCustomRepository } from 'typeorm';
// import AppError from '../errors/AppError';

import TransactionRepository from '../repositories/TransactionsRepository';

import Transaction from '../models/Transaction';
// import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    // const categoryRepository = getRepository(Category);

    const transaction = transactionRepository.create({
      title,
      value,
      type,
    });

    /*   const categoryExist = categoryRepository.findOne({
      where: { title: category },
    });

    if (!categoryExist) {
      const categoryObj = categoryRepository.create({
        title: category,
      });
      transaction.category_id = categoryObj;
    } else {
      transaction.category_id = categoryExist;
    } */

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
