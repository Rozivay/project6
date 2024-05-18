import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addUser } from './userSlice';

Modal.setAppElement('#root');

export function AddStudentModal() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onSubmit = (data) => {
    dispatch(addUser(data))
      .unwrap()
      .then(() => {
        closeModal();
        reset();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button onClick={openModal} style={{ borderRadius: '15px', padding: '5px' }}>ADD NEW STUDENT</button>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <h2>ADD NEW STUDENT</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label>
            NAME:
            <input {...register('name', { 
              required: "Это поле обязательно", 
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "english only"
              }
            })} />
            {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name.message}</p>}
          </label>
          <label>
            EMAIL:
            <input {...register('email', { 
              required: "Это поле обязательно", 
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 
                "wrong email:@"
              }
            })} />
            {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</p>}
          </label>
          <label>
            PHONE NUMBER:
            <input {...register('phone', { 
              required: "Это поле обязательно", 
              pattern: {
                value: /^[0-9]+$/i,
                message: "numbers only"
              }
            })} />
            {errors.phone && <p style={{ color: 'red', fontSize: '12px' }}>{errors.phone.message}</p>}
          </label>
          <button type="submit">submit</button>
        </form>
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );    
}
