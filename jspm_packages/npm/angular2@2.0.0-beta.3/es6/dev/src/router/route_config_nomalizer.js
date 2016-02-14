/* */ 
"format cjs";
import { AsyncRoute, AuxRoute, Route, Redirect } from './route_config_decorator';
import { isType } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
/**
 * Given a JS Object that represents a route config, returns a corresponding Route, AsyncRoute,
 * AuxRoute or Redirect object.
 *
 * Also wraps an AsyncRoute's loader function to add the loaded component's route config to the
 * `RouteRegistry`.
 */
export function normalizeRouteConfig(config, registry) {
    if (config instanceof AsyncRoute) {
        var wrappedLoader = wrapLoaderToReconfigureRegistry(config.loader, registry);
        return new AsyncRoute({
            path: config.path,
            loader: wrappedLoader,
            name: config.name,
            data: config.data,
            useAsDefault: config.useAsDefault
        });
    }
    if (config instanceof Route || config instanceof Redirect || config instanceof AuxRoute) {
        return config;
    }
    if ((+!!config.component) + (+!!config.redirectTo) + (+!!config.loader) != 1) {
        throw new BaseException(`Route config should contain exactly one "component", "loader", or "redirectTo" property.`);
    }
    if (config.as && config.name) {
        throw new BaseException(`Route config should contain exactly one "as" or "name" property.`);
    }
    if (config.as) {
        config.name = config.as;
    }
    if (config.loader) {
        var wrappedLoader = wrapLoaderToReconfigureRegistry(config.loader, registry);
        return new AsyncRoute({
            path: config.path,
            loader: wrappedLoader,
            name: config.name,
            useAsDefault: config.useAsDefault
        });
    }
    if (config.aux) {
        return new AuxRoute({ path: config.aux, component: config.component, name: config.name });
    }
    if (config.component) {
        if (typeof config.component == 'object') {
            let componentDefinitionObject = config.component;
            if (componentDefinitionObject.type == 'constructor') {
                return new Route({
                    path: config.path,
                    component: componentDefinitionObject.constructor,
                    name: config.name,
                    data: config.data,
                    useAsDefault: config.useAsDefault
                });
            }
            else if (componentDefinitionObject.type == 'loader') {
                return new AsyncRoute({
                    path: config.path,
                    loader: componentDefinitionObject.loader,
                    name: config.name,
                    useAsDefault: config.useAsDefault
                });
            }
            else {
                throw new BaseException(`Invalid component type "${componentDefinitionObject.type}". Valid types are "constructor" and "loader".`);
            }
        }
        return new Route(config);
    }
    if (config.redirectTo) {
        return new Redirect({ path: config.path, redirectTo: config.redirectTo });
    }
    return config;
}
function wrapLoaderToReconfigureRegistry(loader, registry) {
    return () => {
        return loader().then((componentType) => {
            registry.configFromComponent(componentType);
            return componentType;
        });
    };
}
export function assertComponentExists(component, path) {
    if (!isType(component)) {
        throw new BaseException(`Component for route "${path}" is not defined, or is not a class.`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVfY29uZmlnX25vbWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy9yb3V0ZXIvcm91dGVfY29uZmlnX25vbWFsaXplci50cyJdLCJuYW1lcyI6WyJub3JtYWxpemVSb3V0ZUNvbmZpZyIsIndyYXBMb2FkZXJUb1JlY29uZmlndXJlUmVnaXN0cnkiLCJhc3NlcnRDb21wb25lbnRFeGlzdHMiXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFrQixNQUFNLDBCQUEwQjtPQUV4RixFQUFDLE1BQU0sRUFBTyxNQUFNLDBCQUEwQjtPQUM5QyxFQUFDLGFBQWEsRUFBbUIsTUFBTSxnQ0FBZ0M7QUFJOUU7Ozs7OztHQU1HO0FBQ0gscUNBQXFDLE1BQXVCLEVBQ3ZCLFFBQXVCO0lBQzFEQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxZQUFZQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQ0EsSUFBSUEsYUFBYUEsR0FBR0EsK0JBQStCQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUM3RUEsTUFBTUEsQ0FBQ0EsSUFBSUEsVUFBVUEsQ0FBQ0E7WUFDcEJBLElBQUlBLEVBQUVBLE1BQU1BLENBQUNBLElBQUlBO1lBQ2pCQSxNQUFNQSxFQUFFQSxhQUFhQTtZQUNyQkEsSUFBSUEsRUFBRUEsTUFBTUEsQ0FBQ0EsSUFBSUE7WUFDakJBLElBQUlBLEVBQUVBLE1BQU1BLENBQUNBLElBQUlBO1lBQ2pCQSxZQUFZQSxFQUFFQSxNQUFNQSxDQUFDQSxZQUFZQTtTQUNsQ0EsQ0FBQ0EsQ0FBQ0E7SUFDTEEsQ0FBQ0E7SUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsWUFBWUEsS0FBS0EsSUFBSUEsTUFBTUEsWUFBWUEsUUFBUUEsSUFBSUEsTUFBTUEsWUFBWUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDeEZB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LFNBQWUsRUFBRSxJQUFZO0lBQ2pFQyxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN2QkEsTUFBTUEsSUFBSUEsYUFBYUEsQ0FBQ0Esd0JBQXdCQSxJQUFJQSxzQ0FBc0NBLENBQUNBLENBQUNBO0lBQzlGQSxDQUFDQTtBQUNIQSxDQUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXN5bmNSb3V0ZSwgQXV4Um91dGUsIFJvdXRlLCBSZWRpcmVjdCwgUm91dGVEZWZpbml0aW9ufSBmcm9tICcuL3JvdXRlX2NvbmZpZ19kZWNvcmF0b3InO1xuaW1wb3J0IHtDb21wb25lbnREZWZpbml0aW9ufSBmcm9tICcuL3JvdXRlX2RlZmluaXRpb24nO1xuaW1wb3J0IHtpc1R5cGUsIFR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1JvdXRlUmVnaXN0cnl9IGZyb20gJy4vcm91dGVfcmVnaXN0cnknO1xuXG5cbi8qKlxuICogR2l2ZW4gYSBKUyBPYmplY3QgdGhhdCByZXByZXNlbnRzIGEgcm91dGUgY29uZmlnLCByZXR1cm5zIGEgY29ycmVzcG9uZGluZyBSb3V0ZSwgQXN5bmNSb3V0ZSxcbiAqIEF1eFJvdXRlIG9yIFJlZGlyZWN0IG9iamVjdC5cbiAqXG4gKiBBbHNvIHdyYXBzIGFuIEFzeW5jUm91dGUncyBsb2FkZXIgZnVuY3Rpb24gdG8gYWRkIHRoZSBsb2FkZWQgY29tcG9uZW50J3Mgcm91dGUgY29uZmlnIHRvIHRoZVxuICogYFJvdXRlUmVnaXN0cnlgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplUm91dGVDb25maWcoY29uZmlnOiBSb3V0ZURlZmluaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaXN0cnk6IFJvdXRlUmVnaXN0cnkpOiBSb3V0ZURlZmluaXRpb24ge1xuICBpZiAoY29uZmlnIGluc3RhbmNlb2YgQXN5bmNSb3V0ZSkge1xuICAgIHZhciB3cmFwcGVkTG9hZGVyID0gd3JhcExvYWRlclRvUmVjb25maWd1cmVSZWdpc3RyeShjb25maWcubG9hZGVyLCByZWdpc3RyeSk7XG4gICAgcmV0dXJuIG5ldyBBc3luY1JvdXRlKHtcbiAgICAgIHBhdGg6IGNvbmZpZy5wYXRoLFxuICAgICAgbG9hZGVyOiB3cmFwcGVkTG9hZGVyLFxuICAgICAgbmFtZTogY29uZmlnLm5hbWUsXG4gICAgICBkYXRhOiBjb25maWcuZGF0YSxcbiAgICAgIHVzZUFzRGVmYXVsdDogY29uZmlnLnVzZUFzRGVmYXVsdFxuICAgIH0pO1xuICB9XG4gIGlmIChjb25maWcgaW5zdGFuY2VvZiBSb3V0ZSB8fCBjb25maWcgaW5zdGFuY2VvZiBSZWRpcmVjdCB8fCBjb25maWcgaW5zdGFuY2VvZiBBdXhSb3V0ZSkge1xuICAgIHJldHVybiA8Um91dGVEZWZpbml0aW9uPmNvbmZpZztcbiAgfVxuXG4gIGlmICgoKyEhY29uZmlnLmNvbXBvbmVudCkgKyAoKyEhY29uZmlnLnJlZGlyZWN0VG8pICsgKCshIWNvbmZpZy5sb2FkZXIpICE9IDEpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgYFJvdXRlIGNvbmZpZyBzaG91bGQgY29udGFpbiBleGFjdGx5IG9uZSBcImNvbXBvbmVudFwiLCBcImxvYWRlclwiLCBvciBcInJlZGlyZWN0VG9cIiBwcm9wZXJ0eS5gKTtcbiAgfVxuICBpZiAoY29uZmlnLmFzICYmIGNvbmZpZy5uYW1lKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFJvdXRlIGNvbmZpZyBzaG91bGQgY29udGFpbiBleGFjdGx5IG9uZSBcImFzXCIgb3IgXCJuYW1lXCIgcHJvcGVydHkuYCk7XG4gIH1cbiAgaWYgKGNvbmZpZy5hcykge1xuICAgIGNvbmZpZy5uYW1lID0gY29uZmlnLmFzO1xuICB9XG4gIGlmIChjb25maWcubG9hZGVyKSB7XG4gICAgdmFyIHdyYXBwZWRMb2FkZXIgPSB3cmFwTG9hZGVyVG9SZWNvbmZpZ3VyZVJlZ2lzdHJ5KGNvbmZpZy5sb2FkZXIsIHJlZ2lzdHJ5KTtcbiAgICByZXR1cm4gbmV3IEFzeW5jUm91dGUoe1xuICAgICAgcGF0aDogY29uZmlnLnBhdGgsXG4gICAgICBsb2FkZXI6IHdyYXBwZWRMb2FkZXIsXG4gICAgICBuYW1lOiBjb25maWcubmFtZSxcbiAgICAgIHVzZUFzRGVmYXVsdDogY29uZmlnLnVzZUFzRGVmYXVsdFxuICAgIH0pO1xuICB9XG4gIGlmIChjb25maWcuYXV4KSB7XG4gICAgcmV0dXJuIG5ldyBBdXhSb3V0ZSh7cGF0aDogY29uZmlnLmF1eCwgY29tcG9uZW50OjxUeXBlPmNvbmZpZy5jb21wb25lbnQsIG5hbWU6IGNvbmZpZy5uYW1lfSk7XG4gIH1cbiAgaWYgKGNvbmZpZy5jb21wb25lbnQpIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5jb21wb25lbnQgPT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCBjb21wb25lbnREZWZpbml0aW9uT2JqZWN0ID0gPENvbXBvbmVudERlZmluaXRpb24+Y29uZmlnLmNvbXBvbmVudDtcbiAgICAgIGlmIChjb21wb25lbnREZWZpbml0aW9uT2JqZWN0LnR5cGUgPT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICByZXR1cm4gbmV3IFJvdXRlKHtcbiAgICAgICAgICBwYXRoOiBjb25maWcucGF0aCxcbiAgICAgICAgICBjb21wb25lbnQ6PFR5cGU+Y29tcG9uZW50RGVmaW5pdGlvbk9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgICBuYW1lOiBjb25maWcubmFtZSxcbiAgICAgICAgICBkYXRhOiBjb25maWcuZGF0YSxcbiAgICAgICAgICB1c2VBc0RlZmF1bHQ6IGNvbmZpZy51c2VBc0RlZmF1bHRcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGNvbXBvbmVudERlZmluaXRpb25PYmplY3QudHlwZSA9PSAnbG9hZGVyJykge1xuICAgICAgICByZXR1cm4gbmV3IEFzeW5jUm91dGUoe1xuICAgICAgICAgIHBhdGg6IGNvbmZpZy5wYXRoLFxuICAgICAgICAgIGxvYWRlcjogY29tcG9uZW50RGVmaW5pdGlvbk9iamVjdC5sb2FkZXIsXG4gICAgICAgICAgbmFtZTogY29uZmlnLm5hbWUsXG4gICAgICAgICAgdXNlQXNEZWZhdWx0OiBjb25maWcudXNlQXNEZWZhdWx0XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICBgSW52YWxpZCBjb21wb25lbnQgdHlwZSBcIiR7Y29tcG9uZW50RGVmaW5pdGlvbk9iamVjdC50eXBlfVwiLiBWYWxpZCB0eXBlcyBhcmUgXCJjb25zdHJ1Y3RvclwiIGFuZCBcImxvYWRlclwiLmApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFJvdXRlKDx7XG4gICAgICBwYXRoOiBzdHJpbmc7XG4gICAgICBjb21wb25lbnQ6IFR5cGU7XG4gICAgICBuYW1lPzogc3RyaW5nO1xuICAgICAgZGF0YT86IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuICAgICAgdXNlQXNEZWZhdWx0PzogYm9vbGVhbjtcbiAgICB9PmNvbmZpZyk7XG4gIH1cblxuICBpZiAoY29uZmlnLnJlZGlyZWN0VG8pIHtcbiAgICByZXR1cm4gbmV3IFJlZGlyZWN0KHtwYXRoOiBjb25maWcucGF0aCwgcmVkaXJlY3RUbzogY29uZmlnLnJlZGlyZWN0VG99KTtcbiAgfVxuXG4gIHJldHVybiBjb25maWc7XG59XG5cblxuZnVuY3Rpb24gd3JhcExvYWRlclRvUmVjb25maWd1cmVSZWdpc3RyeShsb2FkZXI6IEZ1bmN0aW9uLCByZWdpc3RyeTogUm91dGVSZWdpc3RyeSk6IEZ1bmN0aW9uIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICByZXR1cm4gbG9hZGVyKCkudGhlbigoY29tcG9uZW50VHlwZSkgPT4ge1xuICAgICAgcmVnaXN0cnkuY29uZmlnRnJvbUNvbXBvbmVudChjb21wb25lbnRUeXBlKTtcbiAgICAgIHJldHVybiBjb21wb25lbnRUeXBlO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0Q29tcG9uZW50RXhpc3RzKGNvbXBvbmVudDogVHlwZSwgcGF0aDogc3RyaW5nKTogdm9pZCB7XG4gIGlmICghaXNUeXBlKGNvbXBvbmVudCkpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgQ29tcG9uZW50IGZvciByb3V0ZSBcIiR7cGF0aH1cIiBpcyBub3QgZGVmaW5lZCwgb3IgaXMgbm90IGEgY2xhc3MuYCk7XG4gIH1cbn1cbiJdfQ==