const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'your-app'),
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'static' }
      ]
    })
  ]
};

module.exports = {
  mode: 'development',
  entry: {
    main: path.join(__dirname, "src", "Web", "scripts", "main.js"),
    schedule: path.join(__dirname, "src", "Web", "scripts", "schedule.js"),
    base: path.join(__dirname, "src", "Web", "scripts", "base.js"),
    footer: path.join(__dirname, "src", "Web", "scripts", "footer.js"),
    login: path.join(__dirname, "src", "Web", "scripts", "login.js"),
    register: path.join(__dirname, "src", "Web", "scripts", "register.js"),
    logout: path.join(__dirname, "src", "Web", "scripts", "logout.js"),
    create_class: path.join(__dirname, "src", "Web", "scripts", "create_class.js"),
    update_delete_class: path.join(__dirname, "src", "Web", "scripts", "update_delete_class.js"),
    sign_up: path.join(__dirname, "src", "Web", "scripts", "sign_up.js"),


  },
  output: {
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  //TODO loop for template
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "src", "Web", "index.html"),
      chunks: ['main', 'logout', 'base', 'footer']
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      template: path.join(__dirname, "src", "Web", "about.html"),
      chunks: ['logout', 'base', 'footer']
    }),
    new HtmlWebpackPlugin({
      filename: "contact.html",
      template: path.join(__dirname, "src", "Web", "contact.html"),
      chunks: ['logout', 'base', 'footer']
    }),
    new HtmlWebpackPlugin({
      filename: "courses.html",
      template: path.join(__dirname, "src", "Web", "courses.html"),
      chunks: ['logout', 'base', 'footer']
    }),
    new HtmlWebpackPlugin({
      filename: "shop.html",
      template: path.join(__dirname, "src", "Web", "shop.html"),
      chunks: ['logout', 'base', 'footer']
    }),
    new HtmlWebpackPlugin({
      filename: "form.html",
      template: path.join(__dirname, "src", "Web", "form.html"),
      chunks: ['logout', 'base', 'footer']
    }),
    new HtmlWebpackPlugin({
      filename: "gallery.html",
      template: path.join(__dirname, "src", "Web", "gallery.html"),
      chunks: ['logout', 'base', 'footer']
    }),
    new HtmlWebpackPlugin({
      filename: "instructors.html",
      template: path.join(__dirname, "src", "Web", "instructors.html"),
      chunks: ['logout', 'base', 'footer']
    }),
    new HtmlWebpackPlugin({
      filename: "log.html",
      template: path.join(__dirname, "src", "Web", "log.html"),
      chunks: ['logout', 'base', 'footer', 'login']
    }),
    new HtmlWebpackPlugin({
      filename: "price_list.html",
      template: path.join(__dirname, "src", "Web", "price_list.html"),
      chunks: ['logout', 'base', 'footer']
    }),
    new HtmlWebpackPlugin({
      filename: "register.html",
      template: path.join(__dirname, "src", "Web", "register.html"),
      chunks: ['logout', 'register', 'base', 'footer']
    }),
    new HtmlWebpackPlugin({
      filename: "schedule.html",
      template: path.join(__dirname, "src", "Web", "schedule.html"),
      chunks: ['logout', 'schedule', 'base', 'footer']
    }),
    new HtmlWebpackPlugin({
      filename: "create_class.html",
      template: path.join(__dirname, "src", "Web", "create_class.html"),
      chunks: ['create_class', 'base', 'footer', 'logout']
    }),
    new HtmlWebpackPlugin({
      filename: "update_delete_class.html",
      template: path.join(__dirname, "src", "Web", "update_delete_class.html"),
      chunks: ['update_delete_class', 'base', 'footer', 'logout']
    }),
    new HtmlWebpackPlugin({
      filename: "sign_up.html",
      template: path.join(__dirname, "src", "Web", "sign_up.html"),
      chunks: ['sign_up', 'base', 'footer', 'logout']
    }),

  new CopyWebpackPlugin({
      patterns: [
        { from: path.join(__dirname, "src", "Web", "img"),
          to: "img"
        }
      ]
    })
  ],
}
