import Pet from "../../models/Pet"

export default interface PetRepository {
  get(id: string): Promise<Pet | null>
  add(pet: Pet): Promise<Pet>
  update(pet: Pet): Promise<Pet>
  remove(id: string): Promise<void>
  list(ids: string[]): Promise<Pet[]>
}