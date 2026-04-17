import { baseProcedure } from "../../init";

export const getProperties = baseProcedure
  .query(async ({ ctx }) => {
    const properties = await ctx.prisma.houses.findMany({
      take: 25,
    });

    return properties.map((property) => ({
      HOUSE_ID: property.HOUSE_iD,
      HOUSE_NAME: property.HOUSE_NAME,
      HOUSE_ONWER: property.HOUSE_ONWER,
      HOUSE_BUY: Number(property.HOUSE_BUY),
      HOUSE_ACID_ONWER: property.HOUSE_ACID_ONWER,
      HOUSE_PRICE: property.HOUSE_PRICE,
      HOUSE_LEVEL: property.HOUSE_LEVEL,
    }));
  })
