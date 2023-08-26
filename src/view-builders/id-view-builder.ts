

export interface IViewBuilder<T, U>{
    buildView(entity: T) : U;
}