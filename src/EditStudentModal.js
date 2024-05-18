import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { editUser } from './userSlice';

Modal.setAppElement('#root');

export function EditStudentModal({ student }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onSubmit = (data) => {
    dispatch(editUser({ ...student, ...data }))
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
      <span onClick={openModal} style={{ cursor: 'pointer', marginLeft: '5px' }}>✏️</span>
      <Modal isOpen={isOpen} onRequestClose={closeModal} className="modal">
        <h2>EDIT STUDENT</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label>
             NAME:
            <input {...register('name', { 
              required: "Это поле обязательно", 
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Только английский алфавит разрешен"
              }
            })} defaultValue={student.name} />
            {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name.message}</p>}
          </label>
          <label>
            EMAIL:
            <input {...register('email', { 
              required: "Это поле обязательно", 
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Неверный формат электронной почты"
              }
            })} defaultValue={student.email} />
            {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</p>}
          </label>
          <label>
            PHONE NUMBER:
            <input {...register('phone', { 
              required: "Это поле обязательно", 
              pattern: {
                value: /^[0-9]+$/i,
                message: "Только цифры разрешены"
              }
            })} defaultValue={student.phone} />
            {errors.phone && <p style={{ color: 'red', fontSize: '12px' }}>{errors.phone.message}</p>}
          </label>
          <button type="submit">SUBMIT</button>
        </form>
        <button onClick={closeModal}>CLOSE</button>
      </Modal>
    </div>
  );    
}
