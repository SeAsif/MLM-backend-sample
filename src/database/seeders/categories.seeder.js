import { Seeder } from 'mongoose-data-seed';
import { Model } from '../server/models';

const data = [{
  name: "Keto Product",
  description: "Sugar free product",
  slug: 'sugar-free-product',
  status: 1,
  special: 1
},
{
  name: "Keto Product 2",
  description: "Sugar free product",
  slug: 'sugar-free-product',
  status: 1,
  special: 1
}
];

class CategoriesSeeder extends Seeder {

  async shouldRun() {
    return Model.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Model.create(data);
  }
}

export default CategoriesSeeder;
