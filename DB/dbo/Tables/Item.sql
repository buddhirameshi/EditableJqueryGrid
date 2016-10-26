CREATE TABLE [dbo].[Item] (
    [ItemId]      INT          IDENTITY (1, 1) NOT NULL,
    [Price]       MONEY        NULL,
    [Cost]        MONEY        NULL,
    [Description] VARCHAR (50) NULL,
    [PriceTag]    INT          NULL,
    CONSTRAINT [PK_Item] PRIMARY KEY CLUSTERED ([ItemId] ASC)
);

