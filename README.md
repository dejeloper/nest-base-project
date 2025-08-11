# Nest Base Project

Base para aplicaciones medianas y grandes con [NestJS](https://nestjs.com/), enfocada en arquitectura hexagonal (Ports & Adapters) para facilitar sistemas escalables, mantenibles y extensibles.

> ⚠️ **Estado actual:** Proyecto en desarrollo y migración hacia arquitectura hexagonal. Faltan excepciones, documentación completa y tests.

---

## 🚀 Objetivos y funcionalidades en desarrollo

Esta base está pensada para servir como punto de partida de APIs para negocios como restaurantes, tiendas, peluquerías y otros, con funcionalidades comunes que se desean implementar:

- Gestión de usuarios:
  - Administración de usuarios
  - Login y seguridad
  - Administración de roles y permisos
  - Control de horarios
- Administración de menús
- Gestión de controles
- Organización de parámetros
- Estandarización de negocio:
  - Gestión de productos o servicios (menús, inventarios)
  - Procesamiento de pagos y facturación
  - Gestión de reservas y citas
  - Notificaciones (email, SMS, WhatsApp)
  - Auditorías y logs

---

## 📂 Estructura principal

```
src/
  ├─ app/
  ├─ core/
  ├─ auth/
  ├─ payments/
  ├─ permissions/
  ├─ role/
  ├─ shared/
  ├─ user/
  ├─ user-schedule/
prisma/
  ├─ schema.prisma
```

- **core/**: lógica principal según arquitectura hexagonal.
- **prisma/**: esquema y migraciones de base de datos.

---

## ⚙️ Instalación rápida

```sh
git clone https://github.com/dejeloper/nest-base-project.git
cd nest-base-project
pnpm install
```

- Copia `.env.example` a `.env` y ajusta variables.
- Ejecuta migraciones:

```sh
pnpm prisma migrate dev
```

- Inicia en modo desarrollo:

```sh
pnpm start:dev
```

---

## 🔄 Personalización

- Cambia motor de base editando `prisma/schema.prisma` y `.env`.
- Añade nuevos módulos siguiendo la estructura modular y principios hexagonales.

---

## 📊 Estado actual de módulos

| Módulo         | Progreso | Comentarios                                                         |
| -------------- | -------- | ------------------------------------------------------------------- |
| Usuarios       | 60%      | Funcionalidad básica iniciada, falta consolidar lógica y seguridad. |
| Roles          | 60%      | Base funcional, requiere refactorización y tests.                   |
| Permisos       | 60%      | Similar a Roles, en proceso de mejora.                              |
| Horarios       | 50%      | Funcionalidad básica, pendiente integración completa.               |
| Parámetros     | 15%      | Módulo inicial para configuración dinámica.                         |
| Productos      | Planeado | Gestión de productos o servicios (menús, inventarios).              |
| Reservas       | Planeado | Gestión de reservas y citas.                                        |
| Pagos          | Planeado | Procesamiento de pagos y facturación.                               |
| Notificaciones | Planeado | Email, SMS y WhatsApp, además de alertas internas.                  |
| Auditorías     | Planeado | Logs y trazabilidad de acciones.                                    |

---

## 🌐 Demo provisional

[https://nest-base-project.onrender.com/](https://nest-base-project.onrender.com/)

---

## 🤝 Contribuciones

Abre issues o pull requests con sugerencias o mejoras.

---

## 📄 Licencia

MIT License - ver [LICENSE](https://github.com/nestjs/nest/blob/master/LICENSE).
