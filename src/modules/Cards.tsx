import { type FC } from 'react';
import { Button, Card } from 'antd';
import type { StackItem } from '../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const { Meta } = Card;

const deleteStack = async (id: string) => {
  await axios.delete(`http://54.210.160.235/stacks/${id}`);
};

const Cards: FC<{ item: StackItem }> = ({ item }) => {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteStack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stacks'] })
    }
  })

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id.toString())
  }
  return (
    <Card hoverable style={{ width: 300, height: 350 }} className='!p-4 !rounded-full'
      cover={
        <div style={{ height: 320, overflow: 'hidden' }}>
          <img
            alt={item.name}
            src={`http://54.210.160.235/file/${item.image}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '100%'
            }}

          />
        </div>
      }>
      <Meta
        title={
          <div style={{ height: 24, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {item.name}
          </div>
        }
        description={
          <div style={{ height: 20, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {new Date(item.createdAt).toLocaleDateString()}
          </div>
        }
      />
      <div className='pt-5 pb-5 flex justify-between'>
        <Button className='w-[45%] duration-300'>Edit</Button>
        <Button onClick={() => handleDelete(item.id)} className='w-[45%] duration-300'>Delete</Button>
      </div>
    </Card>
  )
};

export default Cards;