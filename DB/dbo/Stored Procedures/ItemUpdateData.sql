-- =============================================

-- =============================================
CREATE PROCEDURE [dbo].[ItemUpdateData]
	@ItemId INT=0,
	@Price MONEY,
	@Description VARCHAR(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @PriceTag INT=0,
			@Cost MONEY =0.00

	IF EXISTS (SELECT ItemID FROM [dbo].[Item] T WHERE T.ItemId=@ItemId)
	BEGIN
			UPDATE [dbo].[Item]
				SET Description=@Description,
				Price=@Price
				WHERE ItemId=@ItemId

	END
	ELSE
			BEGIN
			
				INSERT INTO [dbo].[Item] (Price,Description,PriceTag,Cost)
													VALUES(@Price,@Description,@PriceTag,@Cost)
			END
  
END
