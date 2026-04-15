import { relations } from "drizzle-orm";
import { account, session, user } from "./auth";
import { category } from "./category";

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

// export const categoryRelations = relations(category, ({one, mnay}) => ({
//   user: one(user, {
//     fields: [category.userId],
//     references: [user.id]
//   }),
//   transactions: many(transactions),
//   budget: many(budget)
// }))
