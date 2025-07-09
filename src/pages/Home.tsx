import { useQuery } from "@tanstack/react-query"
import Cards from "../modules/Cards"
import Header from "../modules/Header"
import axios from "axios"
import type { StackItem } from "../types"

const Home = () => {
  const { data: stacks = [] } = useQuery({
    queryKey: ['stacks'],
    queryFn: async () => {
      const response = await axios.get('http://54.210.160.235/stacks')
      return response.data
    }
  })

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-50 p-6 mx-auto">
        {Array.isArray(stacks) ? stacks.map((item: StackItem) => <Cards key={item.id} item={item}/>) : stacks?.data?.map((item: StackItem) => <Cards key={item.id} item={item} />)}
      </div>
    </>
  )
}

export default Home