
import { GraphQLBackend } from '@lib/api/graphql'
import TableModifications from './components/tableModifications';

export default async function Home() {
  const allModifications = await GraphQLBackend.GetAllCarModifications();


  if (allModifications) {


    const uniqueBrands = new Set();
    const uniqueModels = new Set();

    const modificationsWithNames = allModifications.allCarModifications.map(modification => {

      uniqueBrands.add(modification.model.brand.name);
      uniqueModels.add(modification.model.name);


      return {
        id: modification.id,
        name: modification.name,
        horsePower: modification.horsePower,
        weight: modification.weight,
        coupe: modification.coupe,
        model_name: modification.model.name,
        brand_name: modification.model.brand.name
      };
    });

    const brandsArray = Array.from(uniqueBrands);
    const modelsArray = Array.from(uniqueModels);

    return (

      <div className="container mx-auto py-[50px] overflow-x-auto">
        <TableModifications modifications={modificationsWithNames} />
      </div>



    )

  }
}