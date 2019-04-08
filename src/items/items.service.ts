import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [
    { id: '21451541435', name: 'Apples', qty: 2, description: '' },
    { id: '34345', name: 'Peaches', qty: 3, description: '' },
    { id: '476547436', name: 'Bananas', qty: 4, description: '' },
    { id: '23454235', name: 'Pears', qty: 3, description: '' },
    { id: '456857', name: 'Grapes', qty: 1, description: '' },
    { id: '2145', name: 'Strawberries', qty: 8, description: '' },
    { id: '3476', name: 'Mangoes', qty: 6, description: '' },
    { id: '875', name: 'Melons', qty: 4, description: '' },
  ];

  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }

  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
}
