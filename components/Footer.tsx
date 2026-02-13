import { Mail, Twitter, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              TiendexApp
            </h3>
            <p className="text-sm">
              Olvida el cuaderno. Digitaliza tu negocio y gestiona tu
              inventario, clientes y fiados en segundos.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white dark:text-gray-200 mb-4">
              Producto
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/terms"
                  className="text-sm hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Términos de Servicio
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-sm hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white dark:text-gray-200 mb-4">
              Soporte
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/contact"
                  className="text-sm hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href="mailto:soporte@tiendexapp.com"
                  className="flex items-center gap-2 text-sm hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  <Mail size={16} />
                  soporte@tiendexapp.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white dark:text-gray-200 mb-4">
              Síguenos
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/tiendexapp"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 dark:bg-gray-900 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} className="text-white" />
              </a>
              <a
                href="https://facebook.com/tiendexapp"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 dark:bg-gray-900 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} className="text-white" />
              </a>
              <a
                href="https://instagram.com/tiendexapp"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 dark:bg-gray-900 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 dark:border-gray-900">
          <p className="text-center text-sm">
            © {currentYear} TiendexApp. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
