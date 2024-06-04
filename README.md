# redstinkcreature-lib-database

## TypeOrmModule could not be loaded (due to ModuleRef)
Framework dep @nestjs/core is loaded multtiple times. @nestjs/typeorm is affected by this.

For now, whenever deno.lock is re-generated, remove "@nestjs/core" key and value from the "@nestjs/typeorm".
(maybe automate?)