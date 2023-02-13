const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Blog = require('./Blog');
const User = require('./User');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },

      blog_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Blog,
          key: 'id',
        },
      },
    },
  },
  {
    sequelize: sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
