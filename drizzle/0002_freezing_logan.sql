CREATE INDEX "records_dataset_status_country_idx" ON "dataset_records" USING btree ("dataset_id","status","country");--> statement-breakpoint
CREATE INDEX "records_dataset_created_idx" ON "dataset_records" USING btree ("dataset_id","created_at");--> statement-breakpoint
CREATE INDEX "records_dataset_revenue_idx" ON "dataset_records" USING btree ("dataset_id","revenue");--> statement-breakpoint
CREATE INDEX "records_name_trgm_idx" ON "dataset_records" USING gin ("name" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX "records_email_trgm_idx" ON "dataset_records" USING gin ("email" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX "history_record_idx" ON "record_history" USING btree ("record_id");--> statement-breakpoint
CREATE INDEX "relationships_record_idx" ON "record_relationships" USING btree ("record_id");