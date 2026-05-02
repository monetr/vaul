'use client';

import Link from 'next/link';
import { Drawer } from '@monetr/vaul';

export default function Page() {
  return (
    <div className='w-screen h-screen bg-white p-8 flex justify-center items-center'>
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <button className='text-2xl' data-testid='trigger'>
            Open Drawer
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className='fixed inset-0 bg-black/40' data-testid='overlay' />
          <Drawer.Content
            className='bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0'
            data-testid='content'
          >
            <Drawer.Close data-testid='drawer-close'>Close</Drawer.Close>
            <div className='p-4 bg-white rounded-t-[10px] flex-1'>
              <div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8' />
              <div className='max-w-md mx-auto'>
                <Drawer.Title className='font-medium mb-4'>Redirect to another route.</Drawer.Title>
                <p className='text-zinc-600 mb-2'>This route is only used to test the body reset position.</p>
                <p className='text-zinc-600 mb-8'>
                  Go to{' '}
                  <Link className='underline' data-testid='link' href='/with-redirect/long-page'>
                    another route
                  </Link>{' '}
                </p>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
