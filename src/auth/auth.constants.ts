// не использовать это значение. вместо него создайте сложный секрет
export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
    signOptions: { expiresIn: '20h' },
  };